const express = require('express');
const app = express();
const port = process.env.PORT || 3000
// formを扱う
const bodyParser = require('body-parser');
const Joi = require('joi');


app.use(express.json())
app.use(bodyParser.urlencoded({extended: true }))

// 配列を扱う
const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'}
]

app.get('/', (req, res) => {
  res.send('Hello, World');
});

// coursesを全部取得
app.get('/courses', (req, res) => {
  res.send(courses)
})

app.post('/courses', (req, res) => {

  // if (!req.body.name || req.body.length < 3) {
  //   res.send('入力必須です。そして３文字以上で送信してください')
  // }

  const schema = {
    name: Joi.string().min(3).required()
  };

  let result = Joi.validate(req.body, schema)
  if (result.error) {
    res.send(result.error.details[0].message)
  }
  let course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(courses);
});


// coursesを個別に取得
app.get('/courses/:id', (req, res) => {
  let course = courses.find(e => e.id == parseInt(req.params.id))
  if (!course) {
    res.send('idが見つかりません')
  }else {
    res.send(course)
  }
})
// paramsやqueryを扱いたい時
// :yearのようなparamsをreq.paramsで取得し、?id=nameのようなクエリを取得する場合はreq.queryを使用する
app.get('/posts/:year/:month', (req, res) => {
  // res.send(`このページは${req.params.year}年${req.params.month}月の記事です`)
  res.send(req.query)
})


// server起動
app.listen(port, () => {
  console.log(`ポート番号は${port}です`);
});
