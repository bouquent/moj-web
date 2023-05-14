let pg = require('../DB/pg')
const axios = require('axios')


async function getProblem(req, res) {
    result = await pg.query('select * from problem_title');
    let all_problem_data = result.rows;
    res.status(200).send(all_problem_data);
}

async function getProblemData(req, res) {
    let problem_data = await pg.query("SELECT * FROM problem_data WHERE id = $1;", [req.query.problemId]);
    if (problem_data.rows.length == 0) {
        res.status(401).end("");
        return;
    }

    let ret_data = {
        "problemData": problem_data.rows[0],
    }
    res.status(200).send(ret_data);
}

async function saveProblemData(req, res) {
    try {
        let id = req.body.id;
        let title = req.body.title;
        let description = req.body.description;
        let inputFormat = req.body.inputFormat;
        let outputFormat = req.body.outputFormat;
        let sampleInput = req.body.sampleInput;
        let sampleOutput = req.body.sampleOutput;
        let mode = req.body.mode;
        let hint = req.body.hint;
	let difficulty = req.body.difficulty;
	let type = req.body.type;
	let sql = "select save_problem($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
        pg.query(sql, [id, title, description, inputFormat, outputFormat, sampleInput, sampleOutput, mode, hint, difficulty, type]);
	res.status(200).send();
    } catch (error) {
        console.log(error);
    }
 
}

async function saveSubmitHistory(req, res) {
    let problemId = req.body.problemId;
    let problemName = req.body.problemName;
    let submitStatus = req.body.submitStatus;
    let account = req.body.account;
    let time = new Date();
    pg.query('insert into history_submit values(DEFAULT, $1, $2, $3, $4, $5)', [account, problemId, problemName, submitStatus, time]);
    res.status(200).send();
}

async function getSubmitHistory(req, res)
{
   let account = req.query.account;
   let result = await pg.query("select problem_id, problem_name, status, to_char(time, 'YYYY/MM/DD HH24:MI:SS') as time from history_submit where user_account = $1 order by time desc", [account]);
   let theSubmitHistory = result.rows;
   
   res.setHeader("Content-Type", "application/json");
   let ret_data = {
	submitHistory: theSubmitHistory,
   }
   res.status(200).send(ret_data);
}

async function getProblemCount(req, res)
{
   let result = await pg.query("select * from problem_data_id_seq");
   res.setHeader("Content-Type", "application/json");
   let ret_data = {
	problemCount: result.rows[0]['last_value'],
   };

   console.log(ret_data);
   res.status(200).send(ret_data);
}

module.exports = {
    getProblem,
    saveSubmitHistory,
    getProblemData,
    getSubmitHistory,
    getProblemCount,
    saveProblemData,
}
