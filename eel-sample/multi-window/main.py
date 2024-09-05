import eel

# 初始化 Eel，指定 web 文件夹
eel.init('web')

# 暴露一个 Python 函数给 JavaScript 调用
@eel.expose
def send_message_to_window(window_name, message):
    eel.receive_message_from_main(message)(window_name)

# 启动主窗口
eel.start('index.html', size=(300, 200), block=False)

# 使用 eel.spawn 启动其他窗口
eel.spawn(lambda: eel.start('window1.html', mode='chrome', size=(300, 200), port=8001, block=True))
eel.spawn(lambda: eel.start('window2.html', mode='chrome', size=(300, 200), port=8002, block=True))

# 保持主进程运行
eel.sleep(10)