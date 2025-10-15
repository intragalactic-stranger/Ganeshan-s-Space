# AWS Secrets Manager Setup for Amplify

This guide walks you through setting up AWS Secrets Manager to store your Gemini API credentials for use in AWS Amplify.

## Prerequisites

- AWS CLI installed and configured
- Access to AWS Console
- Your Gemini API key from Google AI Studio
- AWS Amplify app deployed

## Step 1: Create the Secret in AWS Secrets Manager

You have two options for storing your Gemini configuration:

### Option A: Store as JSON (Recommended)

Create a secret named `amplify/gemini/config` with the following JSON structure:

```bash
aws secretsmanager create-secret \
  --name amplify/gemini/config \
  --description "Gemini API configuration for Amplify app" \
  --secret-string '{
    "GEMINI_API_KEY": "your-actual-api-key-here",
    "NEXT_PUBLIC_GEMINI_MODEL": "gemini-1.5-flash-002",
    "GEMINI_SYSTEM_PROMPT": "You are a helpful AI assistant"
  }' \
  --region us-east-1
```

### Option B: Store API Key Only

Create a secret named `amplify/gemini/apiKey` with just the API key:

```bash
aws secretsmanager create-secret \
  --name amplify/gemini/apiKey \
  --description "Gemini API key for Amplify app" \
  --secret-string "your-actual-api-key-here" \
  --region us-east-1
```

## Step 2: Configure IAM Role for Amplify

Your Amplify app's service role needs permission to read from Secrets Manager.

### Find Your Amplify Service Role

1. Go to AWS Amplify Console
2. Select your app
3. Go to **App settings** → **General**
4. Note the **Service role** ARN (e.g., `amplifyServiceRole-xxxxx`)

### Add Secrets Manager Permissions

1. Go to **IAM** in AWS Console
2. Find the role from step 1
3. Click **Add permissions** → **Create inline policy**
4. Use JSON editor and paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue",
        "secretsmanager:DescribeSecret"
      ],
      "Resource": [
        "arn:aws:secretsmanager:us-east-1:YOUR_ACCOUNT_ID:secret:amplify/gemini/*"
      ]
    }
  ]
}
```

5. Replace `YOUR_ACCOUNT_ID` with your actual AWS account ID
6. Name the policy `AmplifySecretsManagerAccess`
7. Click **Create policy**

## Step 3: Configure Environment Variables (Optional)

In Amplify Console, you can optionally set these environment variables:

| Variable | Value | Purpose |
|----------|-------|---------|
| `AWS_REGION` | `us-east-1` | Specify the region where your secrets are stored |
| `SECRET_NAME_GEMINI_JSON` | `amplify/gemini/config` | Override the default JSON secret name |
| `SECRET_NAME_GEMINI_API_KEY` | `amplify/gemini/apiKey` | Override the default API key secret name |
| `SKIP_SECRETS_MANAGER` | `false` | Set to `true` to disable Secrets Manager (not recommended) |

## Step 4: Verify the Setup

After deploying, check your Amplify build logs. You should see:

```
[secrets] Attempting to load from AWS Secrets Manager...
[secrets] Region: us-east-1
[secrets] Secret names: { json: 'amplify/gemini/config', api: 'amplify/gemini/apiKey' }
[secrets] Successfully loaded from JSON secret
[secrets] Final config sources: { secretJson: true }
[secrets] Config status: { hasApiKey: true, hasModel: true, hasSystemPrompt: true }
```

## Troubleshooting

### Error: ResourceNotFoundException

**Problem**: Secret not found

**Solution**: 
- Verify the secret name matches exactly
- Ensure you're using the same AWS region
- Check the secret exists: `aws secretsmanager list-secrets --region us-east-1`

### Error: AccessDeniedException

**Problem**: IAM role doesn't have permission

**Solution**:
- Verify the IAM policy is attached to the correct role
- Check the resource ARN in the policy matches your secret
- Ensure the account ID is correct

### API Key Still Not Found

**Fallback Options**:

1. **Use Amplify Environment Variables** (less secure):
   - Go to Amplify Console → App settings → Environment variables
   - Add `GEMINI_API_KEY` with your key
   - Redeploy

2. **Check Logs**:
   - Go to Amplify Console → Your app → Build logs
   - Look for `[secrets]` prefixed messages
   - Check for specific error messages in the logs

3. **Test API Endpoint**:
   ```bash
   curl -X POST https://your-app.amplifyapp.com/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello"}'
   ```

## Security Best Practices

1. **Never commit secrets to Git**: Use `.gitignore` for any local `.env` files
2. **Rotate keys regularly**: Update secrets in Secrets Manager periodically
3. **Use least privilege**: Only grant necessary permissions to the IAM role
4. **Enable secret rotation**: Consider setting up automatic rotation for sensitive keys
5. **Monitor access**: Enable CloudTrail to track secret access

## Cost Considerations

AWS Secrets Manager pricing (as of 2024):
- $0.40 per secret per month
- $0.05 per 10,000 API calls

For a typical Amplify app with 2 secrets and moderate traffic, expect < $1/month.

## Alternative: Use Amplify Environment Variables

If you prefer not to use Secrets Manager, you can set environment variables directly in Amplify:

1. Go to Amplify Console
2. App settings → Environment variables
3. Add:
   - `GEMINI_API_KEY` = your key
   - `NEXT_PUBLIC_GEMINI_MODEL` = `gemini-1.5-flash-002`
   - `GEMINI_SYSTEM_PROMPT` = your prompt
4. Set `SKIP_SECRETS_MANAGER` = `true`
5. Redeploy

**Note**: This is less secure as environment variables are visible in the console to anyone with access.
