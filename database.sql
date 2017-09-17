CREATE TABLE tasklist (
	id SERIAL PRIMARY KEY,
	task VARCHAR (200),
	taskcompleted BOOLEAN
);

ALTER TABLE tasklist ALTER COLUMN taskcompleted SET DEFAULT FALSE;