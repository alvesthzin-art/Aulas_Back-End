use db_filmes_20261_a;

show tables;

select * from tbl_filme;
select * from tbl_classificacao;
select * from tbl_genero;
select * from tbl_filme_genero;

# Relacionamento entre tabelas
# INNER JOIN
# Retona somente os dados relacionados entre as duas tabelas  (Em comum entre os dois lados)
select tbl_filme.nome, tbl_filme.data_lancamento, tbl_filme.sinopse,
		tbl_classificacao.sigla
from tbl_filme
		inner join tbl_classificacao
			on tbl_classificacao.id = tbl_filme.id_classificacao;
        
# LEFT JOIN
# Retorna os dados relacionados entre as duas tabelas e os dados existentes na da tabela da esquerda
#que não esta relacionado com a tabela da direita
select tbl_filme.nome, tbl_filme.data_lancamento, tbl_filme.sinopse,
		tbl_classificacao.sigla
from tbl_filme
		left join tbl_classificacao
			on tbl_classificacao.id = tbl_filme.id_classificacao;        
            
# RIGHT JOIN
# Retorna os dados relacionados entre as duas tabelas e os dados existentes na tabela da direita
#que não esta relacionado com a tabela da esquerda
select tbl_filme.nome, tbl_filme.data_lancamento, tbl_filme.sinopse,
		tbl_classificacao.sigla
from tbl_filme
		right join tbl_classificacao
			on tbl_classificacao.id = tbl_filme.id_classificacao;                 
            
            
insert into tbl_genero (nome) 
			values ('Drama'),
				   ('Terror'),		
				   ('Romance'),
                   ('Comédia'),
                   ('Aventura'),
                   ('Documentário'),
                   ('Suspense');
                   
insert into tbl_filme_genero (id_filme, id_genero)
			values (10, 1),
				   (10, 3),
                   (10, 4),
                   (11, 2),
                   (11, 4);
                   
# Script para retornar os filme com as relações entre Classificação e Genero                   
select 	tbl_filme.nome as nome_filme, tbl_filme.sinopse, tbl_filme.duracao,
		tbl_classificacao.sigla, tbl_classificacao.nome as nome_classificacao, tbl_classificacao.caracteristicas, 
		tbl_genero.nome as nome_genero
       
from   	tbl_filme
			inner join tbl_classificacao
				on tbl_classificacao.id = tbl_filme.id_classificacao
			left join tbl_filme_genero
				on tbl_filme.id = tbl_filme_genero.id_filme
			left join tbl_genero
				on tbl_genero.id = tbl_filme_genero.id_genero
where tbl_filme.nome like '%mario%'
			order by tbl_filme.nome asc;
            


select tbl_filme.nome as nome_filme, tbl_genero.nome as nome_genero
	from tbl_filme
		inner join tbl_filme_genero
			on tbl_filme.id = tbl_filme_genero.id_filme
		inner join tbl_genero
			on tbl_genero.id = tbl_filme_genero.id_genero;



            
select * from tbl_filme;
select * from tbl_classificacao where id = 4;
select * from tbl_genero;

# SubConsulta
select * from tbl_filme_genero where id_filme in (
													select tbl_filme.id from tbl_filme
                                                );    

select * from tbl_filme_genero;
delete from tbl_filme_genero;
