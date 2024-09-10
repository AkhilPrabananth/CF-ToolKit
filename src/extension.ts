// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const provider = new CftkViewProvider(context.extensionUri);
	context.subscriptions.push(vscode.window.registerWebviewViewProvider(CftkViewProvider.viewType, provider));
}

class CftkViewProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'cftk-view';

	private _view?: vscode.WebviewView;

	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview();
	}

	private _getHtmlForWebview(){
		return `<!DOCTYPE html>
		<html>
		<head><title>CodeForces Tool Kit</title></head>
		<body>
		<p> The webview works!!! </p>
		</body>
		</html>`;
	}
}


// This method is called when your extension is deactivated
export function deactivate() {}
