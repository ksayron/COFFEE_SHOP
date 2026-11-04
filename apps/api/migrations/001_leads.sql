CREATE TABLE leads (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name varchar(80) NOT NULL CHECK (char_length(name) > 0),
  phone varchar(16) NOT NULL CHECK (phone ~ '^\+375[0-9]{9}$'),
  interest text NOT NULL CHECK (interest IN ('subscription','one_time','question')),
  comment varchar(1000) NOT NULL DEFAULT '',
  product text CHECK (product IN ('ethiopia','colombia','brazil','drips')),
  attribution jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
CREATE INDEX leads_phone_created_idx ON leads (phone, created_at DESC);
