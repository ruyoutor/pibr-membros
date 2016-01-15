var DataTypes = require("sequelize");

module.exports = function(){
    
    var Pessoa = DataTypes.define('pessoa', {
        
        idPessoa: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'id_pessoa',
            autoIncrement: true
        },
        nome: DataTypes.STRING, 
        cpf: DataTypes.STRING,
        rg: DataTypes.STRING,
        orgaoExpeditor: {
            type: DataTypes.INTEGER,
            field: 'orgao_expeditor'
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
        idiomas: DataTypes.STRING
    },
    {
        underscored: true,
        freezeTableName: true,
        instanceMethods: {
            todos: function(){//onSuccess, onError) {
			    return Pessoa.findAll({}, {raw: true}); //.success(onSuccess).error(onError);
	        },
            porId: function(user_id, onSuccess, onError) {
			    Pessoa.find({where: {id_pessoa: user_id}}, {raw: true}).success(onSuccess).error(onError);
	        }
	        ,
	        novo: function(onSuccess, onError){
    			Pessoa.save().success(onSuccess).error(onError);
	        },
	        updateById: function(user_id, onSuccess, onError) {

    
    			Pessoa.update({
                        nome: this.nome, 
                        cpf: this.cpf,
                        rg: this.rg,
                        nascimento: this.nascimento,
                        estadoCivil: this.estadoCivil,
                        naturalidade: this.naturalidade,
                        profissao: this.profissao,
                        grauInstrucao: this.grauInstrucao,
                        sexo: this.sexo,
                        religiao: this.religiao,
                        idiomas: this.idiomas
                    },{where: {id_pessoa: user_id} }).success(onSuccess).error(onError);
    	   }	        
        }
    });
    
    return Pessoa;
}