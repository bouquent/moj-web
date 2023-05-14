CREATE OR REPLACE FUNCTION create_user(
    in_user_password TEXT,
    in_user_name TEXT
)
RETURNS BIGINT AS $$
DECLARE
    random_num BIGINT;
BEGIN
    LOOP
        -- 生成随机数
        SELECT floor(random() * (9999999999 - 1000000000 + 1) + 1000000000)
        INTO random_num;
        
        -- 检查随机数是否已经存在
        IF NOT EXISTS (SELECT 1 FROM moj_user WHERE user_account = random_num) THEN
            -- 插入数据
            INSERT INTO moj_user(user_account, user_name, user_password)
            VALUES (random_num, in_user_name, in_user_password);
            
            -- 返回插入的数据
            RETURN random_num;
        END IF;
    END LOOP;
    
    -- 如果没有成功插入数据，则返回 -1
    RETURN -1;
END;
$$ LANGUAGE plpgsql;