
select tbl_autor.nome, tbl_sexo.nome
from tbl_autor
	inner join tbl_sexo
		on tbl_sexo.id = tbl_autor.id_sexo;

select 
    a.nome AS nome_autor, 
    n.nome AS nome_nacionalidade
FROM tbl_autor a
INNER JOIN tbl_nacionalidade n ON n.id = a.id_nacionalidade;
        

