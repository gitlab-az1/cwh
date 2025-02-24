CREATE TABLE IF NOT EXISTS users (
  user_id VARCHAR(128) NOT NULL UNIQUE PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS url_reports (
  report_id VARCHAR(128) NOT NULL UNIQUE PRIMARY KEY,
  tool_id VARCHAR(128) NULL,
  content_id VARCHAR(128) NULL,
  target_url TEXT NOT NULL,
  user_id VARCHAR(128) NULL,
  tid TEXT NOT NULL,
  rid TEXT NOT NULL,
  request_ua TEXT NULL,
  request_inet TEXT NULL,
  sequence SERIAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE RESTRICT,
  FOREIGN KEY (tool_id) REFERENCES cs_tools(tool_id) ON DELETE SET NULL ON UPDATE RESTRICT,
  FOREIGN KEY (content_id) REFERENCES cs_content(content_id) ON DELETE SET NULL ON UPDATE RESTRICT
);

CREATE TABLE IF NOT EXISTS cs_tags (
  tag_id VARCHAR(128) NOT NULL UNIQUE PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS cs_tools (
  tool_id VARCHAR(128) NOT NULL UNIQUE PRIMARY KEY,
  category_id VARCHAR(16) NOT NULL,
  full_name VARCHAR(255) NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  price_unit VARCHAR(4) NOT NULL DEFAULT 'USD',
  open_source BOOLEAN NOT NULL DEFAULT TRUE,
  trusted_rating DECIMAL(3, 2) NOT NULL DEFAULT 0.35 CHECK (trusted_rating >= 0 AND trusted_rating <= 1),
  pl TEXT[] NOT NULL DEFAULT '{}'::TEXT[], -- Programing Language(s) (if available)
  image_url TEXT NULL,
  short_description TEXT NULL,
  description TEXT NULL,
  website_url TEXT NULL,
  docs_url TEXT NULL,
  repository JSON NULL, -- { provider: git | gitlab | etc., url: <string> }
  license VARCHAR(32) NULL,
  version VARCHAR(64) NULL,
  last_updated TIMESTAMP WITHOUT TIME ZONE NULL,
  supported_operating_systems TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
  developer JSON NOT NULL DEFAULT '{"full_name":null,"github_url":null,"linkedin":null,"user_id":null}',
  good_clicks BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TYPE content_type AS ENUM('video', 'course', 'website');

CREATE TABLE IF NOT EXISTS cs_content (
  content_id VARCHAR(128) NOT NULL UNIQUE PRIMARY KEY,
  type content_type NOT NULL,
  content_provider TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  content_url TEXT NOT NULL,
  duration VARCHAR(32) NULL,
  difficulty VARCHAR(32) NULL,
  language VARCHAR(64) NULL,
  platform VARCHAR(128) NULL,
  instructor VARCHAR(255) NULL,
  release_date DATE NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  price_unit VARCHAR(4) NOT NULL DEFAULT 'USD',
  good_clicks BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS cs_tool_tags (
  cs_tool_tags_row_id SERIAL NOT NULL PRIMARY KEY,
  tag_id VARCHAR(128) NOT NULL,
  tool_id VARCHAR(128) NOT NULL,
  FOREIGN KEY (tag_id) REFERENCES cs_tags(tag_id) ON DELETE CASCADE ON UPDATE RESTRICT,
  FOREIGN KEY (tool_id) REFERENCES cs_tools(tool_id) ON DELETE CASCADE ON UPDATE RESTRICT
);

CREATE TABLE IF NOT EXISTS cs_content_tags (
  cs_content_tags_row_id SERIAL NOT NULL PRIMARY KEY,
  tag_id VARCHAR(128) NOT NULL,
  content_id VARCHAR(128) NOT NULL,
  FOREIGN KEY (tag_id) REFERENCES cs_tags(tag_id) ON DELETE CASCADE ON UPDATE RESTRICT,
  FOREIGN KEY (content_id) REFERENCES cs_content(content_id) ON DELETE CASCADE ON UPDATE RESTRICT
);

CREATE TABLE IF NOT EXISTS evaluations (
  evaluation_id VARCHAR(128) NOT NULL UNIQUE PRIMARY KEY,
  user_id VARCHAR(128) NOT NULL,
  tool_id VARCHAR(128) NULL,
  content_id VARCHAR(128) NULL,
  general_score INTEGER NOT NULL DEFAULT 2 CHECK (general_score >= 1 AND general_score <= 5),
  specific_item_scores JSON NOT NULL DEFAULT '{}'::JSON,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
  FOREIGN KEY (tool_id) REFERENCES cs_tools(tool_id) ON DELETE CASCADE ON UPDATE RESTRICT,
  FOREIGN KEY (content_id) REFERENCES cs_content(content_id) ON DELETE CASCADE ON UPDATE RESTRICT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE RESTRICT,
);
