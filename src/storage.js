const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const excluirImagemProduto = async (link) => {
    const caminho = link.split('backblazeb2.com/')[1]
    await s3.deleteObject({
        Bucket: process.env.BUCKET,
        Key: caminho
    })
}

module.exports = {
    excluirImagemProduto,
}