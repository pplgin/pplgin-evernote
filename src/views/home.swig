<!DOCTYPE html>
<html>
<head>
  <title>Evernote-MarkDown</title>
</head>
<body>
  <h1>我的日记本</h1>
  <ul>
    {% for note in notebooks %}
      <li{% if loop.first %} class="first"{% endif %}>
        <a href={{'/note/'+ note.guid}}>{{ note.name }}</a>
      </li>
    {% endfor %}
  </ul>
</body>
</html>