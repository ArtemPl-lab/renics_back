module.exports = init;


async function init(app){
    const Account = app.models.Account;
    const RoleMapping = app.models.RoleMapping;
    const Role = app.models.Role;

    const AccountsCount = (await Account.find()).length;
    if(!AccountsCount){
        Account.create([
            {username: 'Admin', email: 'admin@renics.org', password: 'Admin180'},
            {username: 'Покупатель', email: 'saler@test.ru', password: 'saler123'}
          ], function(err, Accounts) {
            if (err) throw err;
            Role.findOrCreate({
              name: 'admin'
            },{
              name: 'admin'
            }, function(err, role) {
              if (err) throw err;
              role.principals.create({
                principalType: RoleMapping.USER,
                principalId: Accounts[0].id
              }, function(err, principal) {
                if (err) throw err;
                console.log('Created principal:', principal);
              });
            });
        });
    }
    else{
        console.log(await Account.find());
        console.log(await Role.find());
    }
}