** Requisitos Funcionais ** RF

** Requisitos Não Funcionais ** RNF

** Regra de Negócio **  RN

# Cadastro de Usuários
# Cadastro de Carros
  **RF**
  Deve ser possivel cadastrar um novo carro
  Deve ser possivel listar todas as categorias
  

  **RN**
  Não deve ser possivel cadastrar um carro existente.
  Não deve ser possivel alterar a placa de um carro.
  O carro deve sser cadastrado como disponível por padrão.
  Somente Usuários com permições de administrador podem registrar carros.

# Listagem de Carros
  **RF**
  Deve ser possivel listar todos os carros disponiveis
  Deve ser possível  listar todos os carros pelo nome da categoria
  Deve ser possível  listar todos os carros pelo nome da marca
  Deve ser possível  listar todos os carros pelo nome do carro

  **RN**
  O usuário não precisar estar logado no sistema
  Deve ser possivel listar todas as especificações

# Cadastro de Especificação Do carro 
  **RF**
  Deve ser possivel cadastrar uma especificação para um carro
  Deve ser possivel listar todas as esepecificações
  Deve ser possivel listar todos os carros

  **RN**
  Não deve ser possivel cadastrar uma especifição para um carro não cadastrado.
  Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
  Somente Usuários com permições de administrador podem registrar especiicações.

# Cadastro de imagesn de carro
  **RF**
  Deve ser possível cadastrar a imagem do carro
  Deve ser possível listar todos os carros

  **RNF**
  Utilixar o multer para upload dos arquivos
  **RN**
  O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
  Somente Usuários com permições de administrador podem registrar imagens.

# Aluguel de carro

  **RF**
  Deve ser possivel cadastrar um aluguel

  **RNF**
  
  **RN**
  O aluguel deve ter duração minima de 1 dia
  Não deve ser possivel cadastrar novo aluguel já exista um aberto para o mesmo usuário
  Não deve ser possivel cadastrar novo aluguel já exista um aberto para o mesmo carro