const mysql = require('sync-mysql');

class DaoEmp {
  constructor() {
    this.conn = new mysql({
      host: 'localhost',
      user: 'root',
      password: 'react',
      database: 'react',
      port: 3305
    });
  }

  selectList() {
    var sql = `
      select
        e_id, e_name, gen, addr
      from
        emp
    `;
    const list = this.conn.query(sql);
    
    return list;
  }

}

module.exports = DaoEmp;

if (require.main === module) {
  const de = new DaoEmp();
  let list = de.selectList();
  console.log(list);
}