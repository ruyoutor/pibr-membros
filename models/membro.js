'use strict';
module.exports = function(sequelize, DataTypes) {
    
    var Membro = sequelize.define('Membro', {
        
        idMembro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'id_membro',
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
        tpAdmissao: {
            type: DataTypes.INTEGER,
            field: 'tp_admissao'
        },
        dtProfissaoFe: {
            type: DataTypes.DATE,
            field: 'dt_profissao_fe'
        },
        dtBatismo: {
            type: DataTypes.DATE,
            field: 'dt_batismo'
        },
        nmPastor: {
            type: DataTypes.STRING,
            field: 'nm_pastor'
        },
        situacao: DataTypes.INTEGER,
    }, 
  
    {
        tableName: 'membro',
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Membro.hasOne(models.Pessoa, {as: 'Pessoa', foreignKey: 'id_pessoa'});
            }
        },
        instanceMethods: {
            
            obtemTodos: function(onSucesso, onErro){
                Membro.findAll({where: {id_pessoa: this.idPessoa}}).then(onSucesso, onErro);
            },
            
            novo: function(onSucesso, onErro){
                this.save().then(onSucesso, onErro);
            },
            
            obtemPorID: function(onSucesso, onErro){
                Membro.findById(this.idMembro).then(onSucesso, onErro);
            },
            
            obtemPorIdDaPessoa: function(onSucesso, onErro){
                Membro.find({where: {id_pessoa: this.idPessoa}}).then(onSucesso, onErro);
            },
            
            atualiza: function(onSucesso, onErro){
                Membro.update(sanitizaMembro(this), {where: {id_membro: this.idMembro}}).then(onSucesso, onErro);
            },
            
            remove: function(onSucesso, onErro){
                Membro.destroy({where: {id_membro: this.idMembro}}).then(onSucesso, onErro)
            }
            
        }
    }
    );

  return Membro;
};


function sanitizaMembro(obj){
    return {
        idMembro: obj.idMembro,
        idPessoa: obj.idPessoa,
        tpAdmissao: obj.tpAdmissao,
        dtProfissaoFe: obj.dtProfissaoFe,
        dtBatismo: obj.dtBatismo,
        nmPastor: obj.nmPastor,
        situacao: obj.situacao
    };

}