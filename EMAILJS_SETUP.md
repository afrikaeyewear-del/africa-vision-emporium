# EmailJS Setup Guide

This guide will help you set up EmailJS to send contact form emails directly to info@afrikaeyewear.com.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)

## Step 2: Create an Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note your **Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
New Contact Form Message: {{subject}}
```

**Content:**
```
You have received a new message from your website contact form.

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your website contact form.
Reply to: {{reply_to}}
```

4. Set the **To Email** field to: `info@afrikaeyewear.com`
5. Set the **Reply To** field to: `{{reply_to}}`
6. Note your **Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** > **General** in the EmailJS dashboard
2. Find your **Public Key**
3. Copy it (you'll need this later)

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env` in the root of your project:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

3. Replace the placeholder values with your actual:
   - Service ID (from Step 2)
   - Template ID (from Step 3)
   - Public Key (from Step 4)

## Step 6: Test the Contact Form

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact page
3. Fill out and submit the contact form
4. Check info@afrikaeyewear.com inbox for the test email

## Troubleshooting

- **"EmailJS is not configured" error**: Make sure all three environment variables are set in your `.env` file
- **Emails not sending**: Check that your email service is properly connected in EmailJS dashboard
- **Template variables not working**: Make sure the variable names in your template match exactly (case-sensitive)

## Security Note

The `.env` file should be in your `.gitignore` to prevent committing sensitive credentials. The `.env.example` file is safe to commit as it only contains placeholders.

