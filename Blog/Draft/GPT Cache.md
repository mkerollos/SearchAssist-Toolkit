## GPT Cache
``` mermaid
flowchart TD
        A[Search Request] --> A1["Rules Validation"]
        A1 --> B["getChunkResults"]
        B --> C{"Cache Search"}
        subgraph Cache
            C
            Z2--Positive --> Z4[Store in DB] -->Z5[cache DB]
            Z2{Record Answer}--Negative--> N/A
            C -- Cache Hit --> Z3[Cache DB]
        end
            C -- No Hit --> C1{"Answer Type"}
            C1 --Generative Answer--> E["prepare llm completion request"]
            E --> F["LLM Completion call"]
            F --> G["LLM Answer"]
        
        Z3[Cache DB] -->K
        G --> J[Post Processing]
        C1 --Extractive Answer--> J

        J --> K["Debug payload generation"]
        K --> L["Final Answer"]
        Z1[User Feedback] --> Z2{Record Answer}
```
