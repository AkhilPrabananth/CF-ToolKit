// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cf-tk" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('cf-tk.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from cf-tk!');
	});

	context.subscriptions.push(disposable);

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
