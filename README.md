# TimeTrackerPJ

Um aplicativo simples e eficiente para registro de horas de trabalho voltado para freelancers e profissionais autônomos. Permite acompanhar suas tarefas utilizando um timer em tempo real ou adicionando atividades manualmente. O sistema também calcula automaticamente o valor financeiro com base no seu valor/hora.

## 🚀 Primeiros Passos

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**
   ```bash
   git clone https://github.com/[seu-usuario]/time-tracker-pj.git
   cd time-tracker-pj
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Execute as migrações do banco de dados**
   ```bash
   npx prisma migrate dev
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   pnpm dev
   ```

Acesse o aplicativo em:

[http://localhost:3000](http://localhost:3000)

---

## 🗄️ Tecnologias Utilizadas

- Next.js
- TypeScript
- Prisma ORM
- SQLite (banco de dados local)
- TailwindCSS

