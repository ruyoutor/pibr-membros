'use strict';
module.exports = function(sequelize, DataTypes) {
    
    var Relacao = sequelize.define('Relacao', 
        {
        
            idPessoa: {
                type: DataTypes.INTEGER,
                field: 'id_pessoa',
                primaryKey: true,
                references: {
                    model: 'pessoa',
                    key: 'id_pessoa'
                }
            },
            idRelacao: {
                 type: DataTypes.INTEGER,
                 field: 'id_relacao',
                 primaryKey: true,
                 references: {
                     model: 'pessoa',
                     key: 'id_pessoa'
                 }
            },
            tpRelacao: {
                type: DataTypes.STRING,
                field: 'tp_relacao'
            },      
        },
        {
            tableName: 'relacao',
            underscored: true,
            freezeTableName: true,
            classMethods: {
                associate: function(models) {
                    Relacao.hasOne(models.Pessoa, {as: 'Pessoa', foreignKey: 'id_pessoa'});
                    //Relacao.hasOne(models.Pessoa, {as: 'Pessoa', foreignKey: 'id_relacao'});
                }
            },
            instanceMethods: {
                
                novo: function(onSucesso, onErro){
                    this.save().then(onSucesso, onErro);
                },
                
                obtemPorID: function(onSucesso, onErro){
                    Relacao.find({where: {id_pessoa: this.idPessoa, id_relacao: this.idRelacao}}).then(onSucesso, onErro);
                },
    
                obtemPorIdDaPessoa: function(onSucesso, onErro){
                    Relacao.findAll({where: {id_pessoa: this.idPessoa}}).then(onSucesso, onErro);
                },
                
                remove: function(onSucesso, onErro){
                    Relacao.destroy({where: {id_pessoa: this.idPessoa, id_relacao: this.idRelacao}}).then(onSucesso, onErro)
                }
                
            }
        }
    );
    return Relacao;
};
