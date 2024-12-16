# IE104.P11
# OUR's TEAM MEMBERs:
<table>
  <thead>
    <th>Full Name</th>
    <th>MSSV</th>
  </thead>
  <tbody>
    <td>Đào Nguyên Nhật Minh - 21522824</td>
    <td>Nguyễn Anh Kiệt - 21522822</td>
    <td>Trần Hoàng Nguyên - 21522396</td>
  </tbody>
</table>

# HOW TO RUN THIS WEBSITE
<h1>FE</h1>
  <br/>
  Before starting website, run this command: <i>npm install</i>
  <br/>
  After installing all needed modules, run this command <i>npm start</i> to start website
  
<h1>BE</h1>
  <br/>
  After having clone of this repository in your local machine, install all package listed in requirements.txt by running this command: <i>pip install -r requirements.txt</i>
  <br/>
  Next, let's create file alembic.init and alembic folder by running this command: <i>alembic init alembic</i>
  Inside alembic folder, you will see a folder called 'versions', thí folder used for storing all versions of migration you created, then remove all versions (.py format).
  <br/>
  Next connect to your postgresql by editing:
  <i>sqlalchemy.url</i> in file alembic.init
  <i>SQLALCHEMY_DATABASE_URL</i> in file database.py
  <br/>
  After editing alembic.init and database.py, open postgreSQL and execute the following files DLL.sql, Function.sql, Trigger.sql and Test_data.sql
  Next, use these command to sync data between postgreSQL database and model.py in FastAPI
  <i>alembic revision --autogenerate -m "Initial migration"</i>
  <i>alembic upgrade head</i>
  <br/>
  Finally, run this command: <i>uvicorn main:app --reload</i> to start backend
