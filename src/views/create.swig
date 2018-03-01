<html>
  <header>
    <title>创建日志</title>
  </header>
  <body>
    <form action="/api/note/create" method="post">
      <legend>创建</legend>
      <input type="text" name="title"><br>
      <select name="guid">
        {% for note in notebooks %}
          <option value={{note.guid}}>{{ note.name}}</option>
        {% endfor %}
      </select><br>
      <textarea name="content"></textarea><br/>
      <input type="submit" value="创建">
    </form>

    {% if newguid %}
    <form action="/api/note/delete"  method="post">
      <input type="hidden" name="guid" value={{newguid}}>
      <input type="submit" value="删除">
    </form>
    {% endif %}
  </body>
</html>