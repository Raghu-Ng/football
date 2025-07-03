/*
  # E-commerce Database Schema

  1. New Tables
    - `jerseys`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `description` (text)
      - `category` (text)
      - `sizes` (text array)
      - `stock` (integer)
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `total_amount` (numeric)
      - `status` (text)
      - `stripe_payment_intent_id` (text)
      - `created_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `jersey_id` (uuid, foreign key to jerseys)
      - `quantity` (integer)
      - `size` (text)
      - `price` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create jerseys table
CREATE TABLE IF NOT EXISTS jerseys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  image_url text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  sizes text[] NOT NULL DEFAULT '{}',
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  total_amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  stripe_payment_intent_id text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  jersey_id uuid REFERENCES jerseys(id) NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  size text NOT NULL,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE jerseys ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Jerseys policies (public read, admin write)
CREATE POLICY "Anyone can view jerseys"
  ON jerseys
  FOR SELECT
  TO public
  USING (true);

-- Orders policies (users can only see their own orders)
CREATE POLICY "Users can view own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Order items policies (users can only see items from their orders)
CREATE POLICY "Users can view own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own order items"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Insert sample jerseys
INSERT INTO jerseys (name, price, image_url, description, category, sizes, stock) VALUES
  (
    'United FC Kodagu Home Jersey 2024',
    89,
    'https://images.pexels.com/photos/1337386/pexels-photo-1337386.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    'Official home jersey featuring our iconic blue and white design with premium moisture-wicking fabric.',
    'Home',
    ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    50
  ),
  (
    'United FC Kodagu Away Jersey 2024',
    89,
    'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    'Sleek away jersey in elegant black with gold accents. Perfect for showing your support on the road.',
    'Away',
    ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    45
  ),
  (
    'United FC Kodagu Third Jersey 2024',
    89,
    'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    'Limited edition third jersey with unique gradient design and sustainable materials.',
    'Third',
    ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    30
  ),
  (
    'United FC Kodagu Goalkeeper Jersey',
    79,
    'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    'Professional goalkeeper jersey with enhanced padding and grip technology.',
    'Goalkeeper',
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    25
  ),
  (
    'United FC Kodagu Training Jersey',
    65,
    'https://images.pexels.com/photos/1756013/pexels-photo-1756013.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    'Lightweight training jersey designed for optimal performance during practice sessions.',
    'Training',
    ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    60
  ),
  (
    'United FC Kodagu Retro Jersey',
    95,
    'https://images.pexels.com/photos/1337386/pexels-photo-1337386.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    'Vintage-inspired jersey celebrating our club''s rich history with classic design elements.',
    'Home',
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    20
  );