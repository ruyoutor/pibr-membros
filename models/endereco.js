'use strict';
module.exports = function(sequelize, DataTypes) {
    
    var Endereco = sequelize.define('Endereco', {
      
        idEndereco: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'id_endereco',
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
        cep: DataTypes.BIGINT,
        rua: DataTypes.STRING,
        numero: DataTypes.INTEGER ,
        complemento: DataTypes.STRING,
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        uf: DataTypes.STRING,
        ref: DataTypes.STRING
    }, 
  
    {
        tableName: 'endereco',
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Endereco.hasOne(models.Pessoa, {as: 'Pessoa', foreignKey: 'id_pessoa'});
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
                Endereco.findAll({where: {id_pessoa: this.idPessoa}}).then(onSucesso, onErro);
            },
            
            novo: function(onSucesso, onErro){
                this.save().then(onSucesso, onErro);
            },
            
            obtemPorID: function(onSucesso, onErro){
                Endereco.findById(this.idEndereco).then(onSucesso, onErro);
            },
            
            atualiza: function(onSucesso, onErro){
                Endereco.update(sanitizaEndereco(this), {where: {id_endereco: this.idEndereco}}).then(onSucesso, onErro);
            },
            
            remove: function(onSucesso, onErro){
                Endereco.destroy({where: {id_endereco: this.idEndereco}}).then(onSucesso, onErro)
            }
            
        }
    }
    );

  return Endereco;
};


function sanitizaEndereco(obj){
    
    return {
        idEndereco: obj.idEndereco,
        idPessoa: obj.idPessoa,
        cep: obj.cep,
        rua: obj.rua,
        numero: obj.numero,
        complemento: obj.complemento,
        bairro: obj.bairro,
        cidade: obj.cidade,
        uf: obj.uf,
        ref: obj.ref
    };

}