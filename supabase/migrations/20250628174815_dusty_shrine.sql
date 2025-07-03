/*
  # Add INSERT policy for payment_transactions table

  1. Security
    - Add policy for authenticated users to insert payment transactions
    - Users can only create payment transactions for orders they own
    - Policy checks that the order_id belongs to the authenticated user

  This resolves the RLS violation error when creating payment transactions during checkout.
*/

CREATE POLICY "Users can create payment transactions for own orders"
  ON payment_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = payment_transactions.order_id 
      AND orders.user_id = auth.uid()
    )
  );