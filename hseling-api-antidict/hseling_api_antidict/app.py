# from flask import Flask
# from src.predict import predict
# from flask_jsonrpc import JSONRPC
# from typing import Dict, List
#
# app = Flask(__name__)
# jsonrpc = JSONRPC(app, '/', enable_web_browsable_api=False)
#
#
# @jsonrpc.method('process')
# def process_text(text: str) -> List[Dict]:
#     text = predict(text)
#     return text
#
#
# if __name__ == '__main__':
#     app.run()
