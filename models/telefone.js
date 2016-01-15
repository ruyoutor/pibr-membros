'use strict';
module.exports = function(sequelize, DataTypes) {
    
    var Telefone = sequelize.define('Telefone', 
        {
      
            idTelefone: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'id_telefone',
                autoIncrement: true
            },
            idPessoa: {
                 type: DataTypes.INTEGER,
                 field: 'id_pessoa',
                 references: {
                     model: 'pessoa',
                     key: 'id_pessoa'
                 }
            },
            ddd: DataTypes.INTEGER,
            numero: DataTypes.INTEGER,
            tipo: DataTypes.INTEGER
        }, 
  
        {
            tableName: 'telefone',
            underscored: true,
            freezeTableName: true,
            classMethods: {
                associate: function(models) {
                    Telefone.hasOne(models.Pessoa, {as: 'Pessoa', foreignKey: 'id_pessoa'});
                    //Endereco.belongsTo(models.Pessoa);
                    // Endereco.belongsTo(models.Pessoa, {
                    //     onDelete: "CASCADE",
                    //     //onUpdate: 'CASCADE',
                    //     foreignKey: {
                    //         name: "id_pessoa",
                    //         allowNull: false
                    //     }
                    // });
                }
            },
            instanceMethods: {
            
                obtemTodos: function(onSucesso, onErro){
                    Telefone.findAll({where: {id_pessoa: this.idPessoa}}).then(onSucesso, onErro);
                },
                
                novo: function(onSucesso, onErro){
                    this.save().then(onSucesso, onErro);
                },
                
                obtemPorID: function(onSucesso, onErro){
                    Telefone.findById(this.idTelefone).then(onSucesso, onErro);
                },
                
                atualiza: function(onSucesso, onErro){
                    Telefone.update(sanitizaEndereco(this), {where: {id_telefone: this.idTelefone}}).then(onSucesso, onErro);
                },
                
                remove: function(onSucesso, onErro){
                    Telefone.destroy({where: {id_telefone: this.idTelefone}}).then(onSucesso, onErro)
                }
            
            }
        }
    );

    return Telefone;
};


function sanitizaEndereco(obj){
    
    return {
        idTelefone: obj.idTelefone,
        idPessoa: obj.idPessoa,
        ddd: obj.ddd,
        numero: obj.numero,
        tipo: obj.tipo
    };
}