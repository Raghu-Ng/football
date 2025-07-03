/*
  # Enhanced Checkout and Sponsorship System

  1. New Tables
    - `sponsorship_applications`
      - Complete company and contact information
      - Sponsorship package details and preferences
      - Application status tracking

  2. Enhanced Tables
    - `orders` - Added delivery tracking fields
    - `profiles` - Added country and state fields

  3. Security
    - Enable RLS on sponsorship_applications table
    - Add policies for sponsorship applications
    - Admin-only access for viewing applications
    - Public access for submitting applications

  4. Functions and Triggers
    - Admin check function
    - Updated_at triggers for automatic timestamp updates
*/

-- Create sponsorship applications table
CREATE TABLE IF NOT EXISTS sponsorship_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  website text,
  industry text,
  sponsorship_type text NOT NULL,
  budget text NOT NULL,
  duration text NOT NULL,
  goals text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE sponsorship_applications ENABLE ROW LEVEL SECURITY;

-- Create admin function if it doesn't exist
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  -- For now, return false. In production, you would check against an admin table
  -- or user metadata to determine if the user is an admin
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Sponsorship applications policies
CREATE POLICY "Admins can view all sponsorship applications"
  ON sponsorship_applications
  FOR SELECT
  TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can submit sponsorship applications"
  ON sponsorship_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can update sponsorship applications"
  ON sponsorship_applications
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()));

-- Add delivery tracking fields to orders if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'tracking_number'
  ) THEN
    ALTER TABLE orders ADD COLUMN tracking_number text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'delivery_notes'
  ) THEN
    ALTER TABLE orders ADD COLUMN delivery_notes text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'estimated_delivery'
  ) THEN
    ALTER TABLE orders ADD COLUMN estimated_delivery timestamptz;
  END IF;
END $$;

-- Add customer information fields to profiles if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'country'
  ) THEN
    ALTER TABLE profiles ADD COLUMN country text DEFAULT 'United States';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'state'
  ) THEN
    ALTER TABLE profiles ADD COLUMN state text;
  END IF;
END $$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger to sponsorship_applications
CREATE TRIGGER update_sponsorship_applications_updated_at
  BEFORE UPDATE ON sponsorship_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add updated_at trigger to orders if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers
    WHERE trigger_name = 'update_orders_updated_at'
  ) THEN
    CREATE TRIGGER update_orders_updated_at
      BEFORE UPDATE ON orders
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Add updated_at trigger to profiles if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers
    WHERE trigger_name = 'update_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;