-- Create newsletter subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to subscribe (public newsletter signup)
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to prevent public viewing of all subscriptions (privacy)
CREATE POLICY "No public access to subscription list" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (false);

-- Create index for email lookups
CREATE INDEX idx_newsletter_email ON public.newsletter_subscriptions(email);

-- Create index for active subscriptions
CREATE INDEX idx_newsletter_active ON public.newsletter_subscriptions(is_active) WHERE is_active = true;