CREATE TABLE document_info (
  id          BIGSERIAL     PRIMARY KEY,
  user_id     BIGINT        NOT NULL,
  title       VARCHAR(255)  NOT NULL,
  url         VARCHAR(255)  NOT NULL,
  size        BIGINT        NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT now(),
  updated_at  TIMESTAMP     NOT NULL DEFAULT now(),

  CONSTRAINT fk_document_user_id
    FOREIGN KEY (user_id) REFERENCES user_info(id)
);