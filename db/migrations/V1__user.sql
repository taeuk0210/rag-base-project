CREATE TABLE user_info (
  id             BIGSERIAL     PRIMARY KEY,
  email          VARCHAR(255)  NOT NULL UNIQUE,
  password_hash  VARCHAR(255)  NOT NULL,
  is_active      BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMP     NOT NULL DEFAULT now(),
  updated_at     TIMESTAMP     NOT NULL DEFAULT now()
);