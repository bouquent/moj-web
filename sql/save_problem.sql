CREATE OR REPLACE FUNCTION save_problem(
    id INTEGER, 
    title TEXT, 
    description TEXT, 
    inputFormat TEXT, 
    outputFormat TEXT, 
    sampleInput TEXT, 
    sampleOutput TEXT, 
    mode TEXT, 
    hint TEXT,
    difficulty Text,
    type integer[]
)
RETURNS VOID AS $$
BEGIN
    -- 判断id是否存在
    IF EXISTS (SELECT problem_data.id FROM problem_data WHERE problem_data.id = $1) THEN
        -- id存在，执行更新操作
        UPDATE problem_data SET title = $2, description = $3, inputformat = $4, outputformat = $5, sampleinput = $6, sampleoutput = $7, mode = $8, hint = $9 WHERE problem_data.id = $1;
        UPDATE problem_title SET problem_name = $2, problem_difficulty = $10, problem_type = $11 where problem_title.problem_id = $1;
    ELSE
        -- id不存在，执行插入操作
        INSERT INTO problem_data(id, title, description, inputFormat, outputFormat, sampleInput, sampleOutput, mode, hint) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
	INSERT INTO problem_title VALUES($1, $2, $10, $11);
    END IF;
END;
$$ LANGUAGE plpgsql;
