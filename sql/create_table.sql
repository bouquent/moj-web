CREATE TYPE submit AS (
    problem_id BITINT,
    result_type text
);

CREATE TABLE moj_user (
    user_account BIGINT NOT NULL,
    user_password varchar(20) NOT NULL,
    user_name text not NULL,
    pass_problems_id integer[],

    PRIMARY KEY(user_account)
);

CREATE TABLE problem_title (
    problem_id integer NOT NULL,
    problem_name text NOT NULL,
    problem_difficulty text NOT NULL,
    problem_type integer[],
    is_pass boolean,    

    PRIMARY KEY(problem_id)
);
-- INSERT INTO user (kv_pairs)
-- VALUES (ARRAY[('key1', 'value1')::submit, ('key2', 'value2')::submit]);


CREATE TABLE history_submit(
    submit_id SERIAL PRIMARY KEY,
    user_account BIGINT NOT NULL,
    problem_id INTEGER NOT NULL,
    problem_name TEXT NOT NULL,
    status TEXT NOT NULL,
    time TIMESTAMP NOT NULL
);
-- insert into history_submit values(DEFAULT, 1234567890, 1, 'A加B问题', 'Wrong Answer', '2023-04-30 10:30:00'); 

CREATE TABLE problem_data(
  id serial NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  inputFormat text NOT NULL,
  outputFormat text NOT NULL,
  sampleInput text NOT NULL,
  sampleOutput text NOT NULL,
  mode text NOT NULL,
  hint text,

  PRIMARY KEY(id)
);

--problem_type
--	1:数组
--	2:字符串
--	3:动态规划
--	4:回溯
--	5:分治
--	6:链表
--	7:树
--
--
