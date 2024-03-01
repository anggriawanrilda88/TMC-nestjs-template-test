# This project refer to TMC test
Nestjs template that have feature<br>
<ul>
    <li>Database use PostgreSQL with TypeORM</li>
    <li>Database divide for Command Database and Query Database</li>
    <li>Command Database (for handle execute command query like insert, delete, update) and Query Database (for find/search data)</li>
    <li>Sync between 2 Database use Kafka Producer and Consumer </li>
    <li>Have migration feature</li>
    <li>Have unit testing example</li>
    <li>Have validation DTO</li>
</ul>

# Quick Setup
<ul>
    <li>Installation => `npm install`</li>
    <li>Migration Up database => `npm run typeorm:run-migrations`</li>
    <li>Migration Down database => `npm run typeorm:revert-migrations`</li>
    <li>Run development API with debug hot reload => `npm run start:dev`</li>
</ul>

# API List
<ul>
    <li>POST http://localhost:3000/api/categories<br><pre>
        curl --location 'http://localhost:3000/api/categories' \
        --header 'Authorization: b1b65baf-9a95-4f45-b972-1bed0b29bfd3' \
        --header 'Content-Type: application/json' \
        --data '{
            "name": "ddddd"
        }'
    </pre></li>
    <li>POST http://localhost:3000/api/products</li>
    <li>GET http://localhost:3000/api/search</li>
</ul>