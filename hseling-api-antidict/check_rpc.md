Check the `predict` method
```
curl -i -X POST \
-H "Content-Type: application/json; indent=4" \
-d '{
    "jsonrpc": "2.0",
    "method": "process_input_text",
    "params": {"text": "Пример большого текста для примера!"},
    "id": "1"
}' http://localhost:5000/rpc/
```