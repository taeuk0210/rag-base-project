CREATE TABLE document_ingestions (
    id               BIGSERIAL     PRIMARY KEY,
    user_id          BIGINT        NOT NULL,
    document_id      BIGINT        NOT NULL,
    embedding_model  VARCHAR(255)  NOT NULL,
    embedding_dim    INT           NOT NULL,
    state            VARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    created_at       TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP     NOT NULL DEFAULT NOW(),

    CONSTRAINT check_ingestions_state
        CHECK (state IN ('PENDING','RUNNING','SUCCESS','FAILED')),
    CONSTRAINT fk_ingestions_user_id
        FOREIGN KEY (user_id) REFERENCES user_info(id),
    CONSTRAINT fk_ingestions_document_id
        FOREIGN KEY (document_id) REFERENCES document_info(id)
);

CREATE TABLE chunk_info (
    id               BIGSERIAL     PRIMARY KEY,
    user_id          BIGINT        NOT NULL,
    document_id      BIGINT        NOT NULL,
    ingestion_id     BIGINT        NOT NULL,
    chunk_index      INT           NOT NULL,
    page_start       INT           NOT NULL,
    page_end         INT           NOT NULL,
    is_active        BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMP     NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_chunk_user_id
        FOREIGN KEY (user_id) REFERENCES user_info(id),
    CONSTRAINT fk_chunk_document_id
        FOREIGN KEY (document_id) REFERENCES document_info(id),
    CONSTRAINT fk_chunk_ingestion_id
        FOREIGN KEY (ingestion_id) REFERENCES document_ingestions(id)
);