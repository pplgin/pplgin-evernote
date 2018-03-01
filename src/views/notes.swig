<!DOCTYPE html>
<html>
<head>
  <title>Evernote-MarkDown</title>
</head>
<body>
  <h1>日记列表</h1>
  <ul>
    {% for note in notebooks %}
      <li><a href={{"/note/"+ note.guid + "/detail"}}>{{ note.title }}</a></li>
    {% endfor %}
  </ul>
  <a href="/">返回</a>
</body>
</html>