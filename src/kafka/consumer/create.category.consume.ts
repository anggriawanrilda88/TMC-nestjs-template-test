import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { CategoriesService } from "src/services/categories.service";
import { ProductsService } from "src/services/products.service";

@Injectable()
export class CreateCategoryConsumer implements OnModuleInit {
    constructor(
        private readonly consumerService: ConsumerService,
        private readonly categoriesService: CategoriesService,
        private readonly productsService: ProductsService
    ) { }

    async onModuleInit() {
        await this.consumerService.consume(
            { topics: ['cho.category.create', 'cho.product.create'] },
            {
                eachMessage: async ({ topic, partition, message }) => {
                    console.log({
                        value: message.value.toString(),
                        topic: topic.toString(),
                        partition: partition.toString(),
                    })
                    let data = JSON.parse(message.value.toString());

                    if (topic === 'cho.category.create') {
                        this.categoriesService.createQueryData(data);
                    } else if (topic === 'cho.product.create' || topic === 'cho.product.update') {
                        this.productsService.createQueryData(data);
                    }
                },
            },
        )
    }
}