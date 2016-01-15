'use strict';
module.exports = function(sequelize, DataTypes) {

  var Pessoa = sequelize.define('Pessoa', {
    idPessoa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_pessoa',
        autoIncrement: true
    },
    nome: DataTypes.STRING, 
    cpf: DataTypes.INTEGER,
    rg: DataTypes.INTEGER,
    orgaoExpedidor: {
        type: DataTypes.STRING,
        field: 'orgao_expedidor'
    },
    nascimento: DataTypes.DATE,
    estadoCivil: {
        type: DataTypes.INTEGER,
        field: 'estado_civil'
    },
    naturalidade: DataTypes.STRING,
    profissao: DataTypes.INTEGER,
    grauInstrucao: {
        type: DataTypes.INTEGER,
        field: 'grau_instrucao'
    },
    sexo: DataTypes.STRING,
    religiao: DataTypes.STRING,
    idiomas: DataTypes.STRING,
    email: DataTypes.STRING
  }, 
  
  {
    tableName: 'pessoa',
    underscored: true,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Pessoa.hasMany(models.Endereco, {as: 'Enderecos', foreignKey: 'id_pessoa'});//, {foreignKey: 'id_pessoa'});
        Pessoa.hasMany(models.Telefone, {as: 'Telefones', foreignKey: 'id_pessoa'});//, {foreignKey: 'id_pessoa'});
        Pessoa.hasOne(models.Membro, {as: 'Membro', foreignKey: 'id_pessoa'});//, {foreignKey: 'id_pessoa'});
        Pessoa.hasMany(models.Relacao, {as: 'Relacoes', foreignKey: 'id_pessoa'});
        //Pessoa.hasMany(models.Endereco);
        //, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
      }
    },
    instanceMethods: {
        
        obtemTodos: function(onSucesso, onErro){
            Pessoa.findAll({}).then(onSucesso, onErro);
        },
        
        novo: function(onSucesso, onErro){
            this.save().then(onSucesso, onErro);
        },
        
        obtemPorID: function(onSucesso, onErro){
            Pessoa.findById(this.idPessoa).then(onSucesso, onErro);
        },
        
        obtemPessoasPorId: function(idPessoas, onSucesso, onErro){
            Pessoa.findAll({where: {idPessoa: {$in: idPessoas }}}).then(onSucesso, onErro);
        },
        
        atualiza: function(onSucesso, onErro){
            Pessoa.update(sanitizaPessoa(this), {where: {id_pessoa: this.idPessoa}}).then(onSucesso, onErro);
        },
        
        remove: function(onSucesso, onErro){
            Pessoa.destroy({where: {id_pessoa: this.idPessoa}}).then(onSucesso, onErro)
        }
        
    }
  }

  );
  
  return Pessoa;
};

function sanitizaPessoa(obj){
  return {
    idPessoa: obj.idPessoa,
    nome: obj.nome, 
    cpf: obj.cpf,
    rg: obj.rg,
    orgaoExpedidor: obj.orgaoExpedidor,
    nascimento: obj.nascimento,
    estadoCivil: obj.estadoCivil,
    naturalidade: obj.naturalidade,      
    profissao: obj.profissao,
    grauInstrucao: obj.grauInstrucao,
    sexo: obj.sexo,
    religiao: obj.religiao,
    idiomas: obj.idiomas,
    email: obj.email
  }
}
