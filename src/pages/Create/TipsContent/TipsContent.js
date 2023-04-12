import React from 'react';
import PropTypes from 'prop-types';

const TipsContent = ({ content }) => {

    const dictContent = {
        "start": () => (
            <div className="pa3">
                <bds-typo>
                    <h2 style={{ color: "#3F7DE8" }}>Bem vindo ao MTC!</h2>
                    <span>Por aqui, você pode criar notificações únicas para seus clientes de forma rápida e fácil. Seja para lembrá-los de um evento importante, realizar uma campanha de marketing, divulgar uma promoção ou simplesmente manter contato, nossa extensão é a solução ideal para sua empresa!</span>
                    <br /><br />
                    <span><strong>Para começar, basta preencher as informações nos campos ao lado!</strong> Para cada um deles, lhe ofereceremos algumas <strong>dicas e sugestões.</strong> Caso queira limpar todos os campos preenchidos, clique no botão “Recomeçar”.</span>
                    <br /><br />
                    <span><strong>Experimente agora e veja como nossa extensão pode tornar a comunicação com seus clientes mais fácil e criativa!</strong></span>
                </bds-typo>
                {/* <div className="flex justify-center">
                    <img className="w-30" src={Idea} />
                </div> */}
            </div>
        ),
        "company": () => (
            <div className="pa3">
                <bds-typo>
                    <h2 style={{ color: "#3F7DE8" }}>Nome da sua empresa ou negócio</h2>
                    <span>
                        Preencha com o nome da sua empresa ou negócio. <strong>Esse campo é importante porque ajuda o seu cliente a identificar rapidamente a origem da mensagem.</strong> Além disso, um nome de empresa claro e fácil de lembrar pode aumentar a credibilidade da mensagem.
                    </span>
                    <br /><br />
                    <span>
                        Alguns exemplos fictícios de nomes de empresa:
                    </span>
                    <br />
                    <ul>
                        <li>Padaria Doce Delícia</li>
                        <li>Supermercado Economiza Mais</li>
                        <li>Pet Shop Meu Pet Feliz</li>
                        <li>Livraria Leitores Apaixonados</li>
                        <li>Agência de Viagens Destino Certo</li>
                    </ul>
                    <span>
                        <strong>Lembre-se de que o objetivo é ajudar o cliente a identificar a origem da mensagem.</strong>
                    </span>
                </bds-typo>
            </div>
        ),
        "product": () => (
            <div className="pa3">
                <bds-typo>
                <h2 style={{ color: "#3F7DE8" }}>Nome do produto/serviço</h2>
                <span>
                    Preencha com o nome do produto ou serviço ao qual a mensagem se refere. <strong>Este campo é <span style={{ color: "#3F7DE8" }}>opcional</span>, mas pode ser útil se quiser chamar mais atenção para o produto ou serviço especificado.</strong>
                </span><br /><br />
                <span>
                    Aqui estão alguns exemplos fictícios de produtos e serviços:
                </span><br />
                <ul>
                    <li>Trionelle Trufas</li>
                    <li>Sorvete Derrete-me</li>
                    <li>Nuvixy Smartwatch</li>
                    <li>Quitinete 40m²</li>
                    <li>Corte de Cabelo</li>
                </ul>
                <span>
                    Ao preencher este campo, lembre-se de que o nome do produto ou serviço pode influenciar a experiência do usuário. Por exemplo, se você está enviando uma notificação sobre um novo produto que sua empresa lançou, <strong>escrever o nome do produto de forma clara e concisa pode ajudar o usuário a entender melhor o que está sendo oferecido e, consequentemente, aumentar a probabilidade de conversão.</strong>
                </span>
                </bds-typo>
            </div>
        ),
        "date": () => (
            <div className="pa3">
                <bds-typo>
                    <h2 style={{ color: "#3F7DE8" }}>Quando irá acontecer?</h2>
                    <span>
                        <strong>Este campo é <span style={{ color: "#3F7DE8" }}>opcional</span> e deve ser preenchido caso a notificação esteja relacionada a um evento ou data específica. </strong>
                    </span><br />
                    <span>
                        Por exemplo, se a notificação for para lembrar um usuário de um evento importante ou uma data comemorativa.
                    </span><br /><br />
                    <span>
                        Certifique-se de fornecer a data e hora exatas para que o usuário possa se preparar adequadamente. Para garantir que a notificação seja efetiva, recomendamos que a data e hora fornecidas sejam atualizadas. 
                    </span><br /><br />
                    <span>
                        <strong>Em caso de mudanças na programação do evento, lembre-se de atualizar a notificação o mais rápido possível.</strong>
                    </span><br /><br />
                    <span>
                        Abaixo estão alguns bons exemplos de preenchimento:
                    </span>
                    <ul>
                        <li>”Amanhã”</li>
                        <li>”Dia 02 de março”</li>
                        <li>“Durante as próximas duas semanas”</li>
                        <li>"No próximo sábado”</li>
                        <li>”Em breve”</li>
                    </ul>
                </bds-typo>
            </div>
        ),
        "type": () => (
            <div className="pa3">
                <bds-typo>
                    <h2 style={{ color: "#3F7DE8" }}>Tipo da Mensagem</h2>
                    <span>
                        <strong>Selecione o tipo da mensagem que deseja enviar para seus usuários. </strong>Existem várias opções disponíveis para escolher, cada uma delas projetada para uma finalidade específica.
                    </span><br /><br />
                    <span>
                        Escolha a que melhor representa o propósito da sua mensagem.
                    </span><br />
                    <ul>
                        <li><strong>Aviso:</strong> Notificar os usuários sobre algo importante.</li>
                        <li><strong>Lembrete:</strong> Lembrar os usuários de algo, como um evento.</li>
                        <li><strong>Promoção:</strong> Promover um produto, serviço ou oferta especial para os usuários.</li>
                        <li><strong>Atualização:</strong> Enviar uma notícia ou atualização importante para os usuários, como o lançamento de um novo produto.</li>
                        <li><strong>Saudação:</strong> Mensagem de boas-vindas.</li>
                        <li><strong>Agradecimento:</strong> Mensagem de agradecimento, como após uma compra, inscrição em um evento, ou participação em uma pesquisa.</li>
                        <li><strong>Confirmação:</strong> Confirmação como após uma reserva, cadastro ou compra.</li>
                    </ul>
                </bds-typo>
            </div>
        ),
        "size": () => (
            <div className="pa3">
                <bds-typo>
                    <h2 style={{ color: "#3F7DE8" }}>Tamanho da Mensagem</h2>
                    <span>
                        Essa opção determina o <strong>tamanho aproximado</strong> das mensagens geradas para você.
                    </span>
                    <ul>
                        <li><strong>Curta:</strong> Notificações mais objetivas, normalmente com apenas uma ou duas frases. É geralmente a configuração mais recomendada para mensagens como avisos ou lembretes.</li><br />
                        <li><strong>Média:</strong> Mensagens mais completas, podendo conter mais frequentemente cabeçalhos e despedidas, além do conteúdo central da notificação.</li><br />
                        <li><strong>Longa:</strong> Mensagens complexas, podendo conter cabeçalhos, despedidas e possivelmente mais de um parágrafo principal. Essa opção é recomendada quando há muita informação importante fornecida no campo “Objetivo da Mensagem”.</li>
                    </ul>
                </bds-typo>
            </div>
        ),
        "name": () => (
            <div className="pa3">
                <bds-typo>
                    <h2 style={{ color: "#3F7DE8" }}>Nome do Cliente</h2>
                    <span>
                        Se ativada, essa configuração <strong>vai adicionar no início das mensagens geradas um marcador que pode ser substituído pelo nome do cliente</strong> destinatário ao ser feito o envio da notificação.
                    </span><br /><br />
                    <span>
                        Exemplo de notificação com essa opção ativada:
                    </span><br /><br />
                    <span>
                        "<strong><span style={{ color: "#3F7DE8" }}>Olá {"{1}"} </span></strong>
                        <br /><br />
                        Não deixe de assinar o nosso newsletter para estar sempre atualizado quanto às nossas promoções e condições especiais.
                        <br /><br />
                        Atenciosamente,
                        <br /><br />
                        Casa de Massagens Tao"
                    </span>
                </bds-typo>
            </div>
        ),
        "emoji": () => (
            <div className="pa3">
                <bds-typo>
                    <h2 style={{ color: "#3F7DE8" }}>Incluir Emojis</h2>
                    <span>
                        Se ativada, essa configuração permitirá que o sistema <strong>adicione emojis</strong> automaticamente nas notificações. 
                    </span><br /><br />
                    <span>
                        Os emojis podem ajudar a tornar a mensagem mais atraente, aumentar o engajamento do usuário e tornar a comunicação mais humana.
                    </span><br /><br />
                    <span>
                        <strong>Aqui está um exemplo de como pode ficar a sua notificação: </strong>
                    </span><br /><br />
                    <span>
                        "😊 Olá!,
                        <br />
                        Temos uma promoção exclusiva para você! 🎁
                        <br />
                        Não perca tempo e aproveite agora mesmo nossos descontos especiais!
                        <br />
                        ⏳ A promoção é válida somente hoje!"
                    </span>
                </bds-typo>
            </div>
        ),
        "button": () => (
            <div className="pa3">
                <bds-typo>
                    <h2 style={{ color: "#3F7DE8" }}>Incluir Call to Action para botão</h2>
                    <span>
                        Esse campo permite que o Guru adicione um <strong>Call to Action</strong> na notificação, <strong>incentivando o usuário a clicar nos botões</strong> para realizar uma ação específica.  
                    </span><br /><br />
                    <span>
                        O Guru irá <strong>adicionar o Call to Action automaticamente</strong>, mas o usuário poderá editá-lo na tela posterior, caso queira.
Além disso, com essa opção habilitada, <strong>exibe-se uma seção</strong> para que você possa incluir os textos dos botões.
                    </span><br /><br />
                    <span>
                     Os botões aparecerão na notificação <strong>somente após o usuário clicar em "Submeter"</strong> para enviar a mensagem para análise. 
É importante lembrar que a inclusão de botões pode <strong>aumentar a interação do usuário com a notificação</strong>, tornando-a mais efetiva para o objetivo desejado.
                    </span>
                </bds-typo>
            </div>
        ),
        "objective": () => (
            <div className="pa3">
                <bds-typo>
                    <h2 style={{ color: "#3F7DE8" }}>Objetivo da Mensagem</h2>
                    <span>
                        <strong>Este é o campo <span style={{ color: "#3F7DE8" }}>mais importante</span> para criar uma notificação clara e efetiva.</strong> Aqui, você deve descrever com detalhes o que deseja realizar com a notificação.
                    </span><br /><br />
                    <span>
                        Algumas dicas para ajudá-lo a escrever um objetivo claro e conciso são:
                    </span>
                    <ul>
                        <li><strong>Seja específico:</strong> descreva com clareza qual o propósito da mensagem que você quer enviar.</li>
                        <li><strong>Seja claro:</strong> use uma linguagem simples e que conecta com o público-alvo da mensagem.</li>
                        <li><strong>Forneça contexto:</strong> inclua informações que possam ajudar o usuário a entender melhor a notificação e sua importância.</li>
                    </ul>
                    <span>
                        Aqui estão alguns bons exemplos de objetivos de notificação:
                    </span><br />
                    <ul>
                        <li>"Lembrar os usuários que o prazo para a renovação do seguro de carro está acabando. A notificação deve estar assinada por Joana, Gerente de Relacionamento."</li>
                        <li>"Oferecer aos usuários a chance de participar de uma pesquisa de satisfação e ganhar um brinde exclusivo, uma mochila personalizada com o nome do cliente."</li>
                        <li>"Descreva a mais recente atualização do aplicativo e as novas funcionalidades disponíveis para notificar os usuários. As novas funcionalidades são: melhorias de desempenho, segurança e as novas opções de personalização de conta."</li>
                    </ul>
                    <span>
                        Evite exemplos como estes abaixo:
                    </span><br />
                    <ul>
                        <li><strong>Muito genérico:</strong> Ex: "Campanha de reativação de leads"</li>
                        <li><strong>Não é clara qual a ação que o usuário deve realizar:</strong> Ex: ”Não perca! Dia 27/8 vamos fazer o Super Saldão de Preços Baixos aqui no hortifruti Pereirinha!”</li>
                        <li><strong>Objetivo muito focado na empresa e não fornece informações úteis para o usuário:</strong> Ex: ”Campanha de marketing da Pet Feliz, com o objetivo de aumentar as vendas”</li>
                    </ul>
                </bds-typo>
            </div>
        )       
    }

    return dictContent[content]();
};

TipsContent.propTypes = {
    content: PropTypes.string
};

export default TipsContent;
