#include <QApplication>
#include <QVBoxLayout>
#include <QWebView>

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);

    QWidget window;
    QVBoxLayout layout(&window);

    QWebView webView;
    QString htmlContent = "<html><body><h1>Hello, World!</h1></body></html>";
    webView.setHtml(htmlContent);
    
    layout.addWidget(&webView);
    window.setLayout(&layout);

    window.show();
    return app.exec();
}