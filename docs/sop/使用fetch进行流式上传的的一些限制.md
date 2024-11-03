---
{
  "title": "使用fetch进行流式上传的的一些限制",
  "editLink": true,
}
---

<span data-type="text" style="font-size: 24px;">fetch发送post请求，当body体传输类型为“stream”时，浏览器报错：</span>

::: danger
TypeError: Failed to execute 'fetch' on 'Window': The duplex member must be specified for a request with a streaming body
::: 

## 原因：

> 在浏览器中，只有在请求正文完全发送后，响应才会可用，即使服务器更早发送响应也是如此。 此规则适用于所有浏览器提取。
>
> 这种默认模式称为“半双工”。 不过，某些实现（例如 [Deno 中的 ](https://doc.deno.land/deno/stable/%7E/fetch)​[`fetch`](https://doc.deno.land/deno/stable/%7E/fetch)）默认为“全双工”适用于流式提取，这意味着响应在请求完成之前便可供使用。
>
> 因此，如需解决这一兼容性问题，在浏览器中，`duplex: 'half'` 需要 。

<span data-type="text" style="font-size: 22px;">设置 </span>`duplex: 'half'`​<span data-type="text" style="font-size: 22px;"> 后，浏览器报错：</span>
::: danger
net::ERR_H2_OR_QUIC_REQUIRED
::: 

## 原因：

> 根据 HTTP/1.1 规则，请求正文和响应正文要么需要发送 `Content-Length` 标头，以便另一端知道将接收多少数据，要么将消息格式更改为使用[分块编码](https://en.wikipedia.org/wiki/Chunked_transfer_encoding)。通过分块编码，正文可以分成多个部分，每个部分都有自己的内容长度。
>
> 分块编码在 HTTP/1.1 响应中很常见，但在请求时很少见，因此兼容性风险较大。

注意：stream模式下，无法准确预先计算和提供 `Content-Length` 头，因此stream传输在HTTP1.1中不可用，值得一提的是，为了防止潜在的安全问题和不一致，浏览器会自动管理 `Content-Length`，并不会允许开发者手动覆盖这个头部，所以想通过手动设置`Content-Length`请求头来满足HTTP1.1的规则是行不通的

<span data-type="text" style="font-size: 22px;">参考：</span>

> [https://developer.chrome.com/docs/capabilities/web-apis/fetch-streaming-requests?hl=zh-cn#doesnt_work_on_http1x](https://developer.chrome.com/docs/capabilities/web-apis/fetch-streaming-requests?hl=zh-cn#doesnt_work_on_http1x)
