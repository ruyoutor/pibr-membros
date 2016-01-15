'use strict';
module.exports = function(sequelize, DataTypes) {
    
    var Usuario = sequelize.define('Usuario', {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'id_usuario',
            autoIncrement: true
        },
        login: DataTypes.STRING, 
        email: DataTypes.STRING,
        senha: DataTypes.STRING
    },
    {
        tableName: 'usuario',
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
            }
        },
        instanceMethods: {
            
            obterPorLogin: function(onSucesso, onErro){
                Usuario.find({where: 
                    {
                        $or: [{login: this.login}, {email: this.login}]
                        //,$and: {senha: this.senha}
                    }}).then(onSucesso, onErro);
            },
            
            autentica: function(senha){
                return this.senha === senha;
            },
            
            obtemPorID: function(onSucesso, onErro){
                Usuario.findById(this.idUsuario).then(onSucesso, onErro);
            },
            
            atualiza: function(onSucesso, onErro){
                //Pessoa.update(sanitizaPessoa(this), {where: {id_pessoa: this.idPessoa}}).then(onSucesso, onErro);
            },
            
            remove: function(onSucesso, onErro){
                //Pessoa.destroy({where: {id_pessoa: this.idPessoa}}).then(onSucesso, onErro)
            }
        }
    });
    return Usuario;
}
