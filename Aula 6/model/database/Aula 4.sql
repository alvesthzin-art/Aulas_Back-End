use db_filmes_20261_a;

create table tbl_classificacao (
	id 				int not null auto_increment primary key,
	sigla 			varchar(5) not null,
    nome			varchar(50) not null,
    caracteristica		varchar(200) not null
);

create table tbl_genero (
	id 				int not null auto_increment primary key,
    nome			varchar(30) not null
);

create table tbl_filme_genero (
	id				int not null auto_increment primary key,
    id_filme		int not null,
    id_genero		int not null,
    
    #Relação para o filme
    constraint FK_FILME_FILMEGENERO
    foreign key (id_filme)
    references tbl_filme(id),
    
    #Relação para o genero
    constraint FK_GENERO_FILMEGENERO
    foreign key (id_genero)
    references tbl_genero(id)
);

#Adicionar a coluna da FK e criar a relação com a tabela de classificação
alter table tbl_filme
	add column id_classificacao int not null,
    add constraint FK_CLASSIFICACAO_FILME
		foreign key (id_classificacao)
        references tbl_classificacao(id);
        
select * from tbl_filme;
delete from tbl_filme;

show tables;

insert into tbl_classificacao (sigla, nome, caracteristica)
		values	('L', 'Livre', 'Filme de classificação livre.'),
				('10', 'Maior de 10 anos', 'Conteúdo sensível para menores de 10 anos');

select * from tbl_classificacao;   

 insert into tbl_filme (
							nome,
							data_lancamento,
							duracao,
                            sinopse,
                            avaliacao,
                            valor,
                            capa,
                            id_classificacao
                            )
    values (
							'Super Mario Galaxy: O Filme',
                            '2026-04-02',
                            '01:39:00',
                            'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão.
                            Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano
                            e seus aliados embarcam numa aventura galáctica repleta
                            de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
                            '3',
                            '50.70',
                            'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
                            1
                            );
                            
select * from tbl_filme;

select 	tbl_filme.nome as nome_filme, tbl_filme.sinopse, tbl_filme.data_lancamento, tbl_filme.capa,
		tbl_classificacao.sigla, tbl_classificacao.nome as nome_classificacao
from tbl_filme 
	inner join tbl_classificacao
		on tbl_classificacao.id = tbl_filme.id_classificacao;
                             