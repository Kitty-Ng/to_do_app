CREATE TABLE tasklist (
	id SERIAL PRIMARY KEY,
	task VARCHAR (200),
	taskcompleted BOOLEAN,
	created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE tasklist ALTER COLUMN taskcompleted SET DEFAULT FALSE;
