# Why Environment Variables Show in Build Logs But Not at Runtime

## The Problem

You're seeing environment variables in your Amplify build logs, but they're not available when your API routes execute. This is a common confusion with Next.js on Amplify.

## Root Cause

AWS Amplify has **TWO separate environments**:

### 1. Build Environment (CodeBuild)
- Runs during `npm run build`
- Has access to environment variables from Amplify Console
- Your `amplify.yml` commands run here
- `printenv` shows the variables ✓

### 2. Runtime Environment (Lambda@Edge / Lambda)
- Runs when users make requests to your app
- API routes execute here (`/api/chat`, `/api/debug-env`)
- By default, does NOT inherit build environment variables ✗
- Needs explicit configuration to access variables

## The Fix Applied

Updated `amplify.yml` to include:

```yaml
environment:
  variables:
    GEMINI_API_KEY: ${GEMINI_API_KEY}
    NEXT_PUBLIC_GEMINI_MODEL: ${NEXT_PUBLIC_GEMINI_MODEL}
    GEMINI_SYSTEM_PROMPT: ${GEMINI_SYSTEM_PROMPT}
```

This tells Amplify: "Take these variables from the build environment and inject them into the Lambda runtime environment."

## Visual Explanation

```
┌─────────────────────────────────────────┐
│  Amplify Console Env Vars               │
│  ✓ GEMINI_API_KEY=abc123                │
│  ✓ NEXT_PUBLIC_GEMINI_MODEL=gemini-xxx  │
└───────────────┬─────────────────────────┘
                │
                ├──────────────────┬─────────────────────┐
                │                  │                     │
                ▼                  ▼                     ▼
        ┌───────────────┐  ┌──────────────┐  ┌────────────────┐
        │ Build Phase   │  │ Static Build │  │ Lambda Runtime │
        │ (CodeBuild)   │  │ (Next.js)    │  │ (API Routes)   │
        ├───────────────┤  ├──────────────┤  ├────────────────┤
        │ ✓ Has vars    │  │ ✓ NEXT_PUBLIC│  │ ✗ NO VARS      │
        │ amplify.yml   │  │   → bundled  │  │ (BEFORE FIX)   │
        │ runs here     │  │ ✗ GEMINI_API │  │                │
        │ printenv ✓    │  │   → missing  │  │ ✗ /api/chat    │
        └───────────────┘  └──────────────┘  │   fails        │
                                              └────────────────┘
                                                      │
                                                      ▼
                                              ┌────────────────┐
                                              │ After Fix:     │
                                              │ amplify.yml    │
                                              │ environment:   │
                                              │   variables:   │
                                              │ ✓ Lambda has   │
                                              │   access!      │
                                              └────────────────┘
```

## Why This Happens

1. **Next.js Build Process**: During `npm run build`, Next.js compiles your app
   - `NEXT_PUBLIC_*` variables → Baked into JavaScript bundles
   - Other variables → NOT included in the build output

2. **Amplify Hosting**: Uses AWS Lambda for SSR
   - Each API request runs in a Lambda function
   - Lambda needs environment variables explicitly configured
   - Amplify's `environment.variables` section provides this

3. **The Confusion**: Build logs show variables because:
   - Your `printenv` command runs during the build phase
   - The build phase HAS the variables
   - But those don't automatically transfer to Lambda runtime

## Variable Types in Next.js on Amplify

| Variable Type | Build Time | Client Bundle | Lambda Runtime |
|---------------|------------|---------------|----------------|
| `NEXT_PUBLIC_*` | ✓ | ✓ Bundled | ✓ With config |
| Server secrets | ✓ | ✗ Hidden | Needs `amplify.yml` config |
| AWS Secrets Manager | ✗ | ✗ | ✓ Via IAM role |

## Verification Steps

After the new deployment completes:

1. **Check Build Logs** (should still show variables):
   ```
   Listing GEMINI related env vars:
   GEMINI_API_KEY=<value>
   ```

2. **Test API Endpoint**:
   ```bash
   curl -X POST https://your-app.amplifyapp.com/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "test"}'
   ```

3. **Check Lambda Logs** (CloudWatch):
   - Should see: `[secrets] Found environment variables`
   - Should see: `[secrets] Config status: { hasApiKey: true }`

## Alternative Solutions

### Option 1: Use Amplify Environment Variables (Current Fix)
✓ Simple configuration
✓ Works immediately
✗ Less secure (visible in console)

### Option 2: Use AWS Secrets Manager
✓ More secure
✓ Centralized secret management
✓ Automatic rotation support
✗ Requires IAM role setup

### Option 3: Use AWS Systems Manager Parameter Store
✓ Free tier more generous than Secrets Manager
✓ Secure
✗ Requires IAM setup

## Best Practice Recommendation

For production:
1. Use the `amplify.yml` environment config (current fix) to get it working
2. Then migrate to AWS Secrets Manager for better security
3. Remove variables from Amplify Console once Secrets Manager is configured

## Common Mistakes to Avoid

❌ **Don't**: Assume build environment = runtime environment
❌ **Don't**: Use `NEXT_PUBLIC_` prefix for secrets (they get exposed to browsers!)
❌ **Don't**: Forget to redeploy after changing `amplify.yml`

✓ **Do**: Configure `environment.variables` in `amplify.yml`
✓ **Do**: Test both build logs AND runtime API calls
✓ **Do**: Use Secrets Manager for production secrets

## Summary

**The Issue**: Environment variables are available during the Next.js build but not when API routes execute in Lambda.

**The Solution**: Configure `amplify.yml` to explicitly pass variables from build environment to Lambda runtime environment.

**The Result**: Your chat API can now access `GEMINI_API_KEY` at runtime! 🎉
