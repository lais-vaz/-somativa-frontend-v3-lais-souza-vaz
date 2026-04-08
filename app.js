app.get('/ingressos', async (req, res) => {
    try {
        const ingressos = await queryAsync('SELECT * FROM ingresso')

        res.json({
            sucesso: true,
            dados: ingressos,
            total: ingressos.length
        })

    } catch (erro) {
        console.error('Erro ao listar ingressos:', erro)

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar ingressos',
            erro: erro.message
        })
    }
})


app.get('/ingressos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const idNum = parseInt(id)

        if (!id || isNaN(idNum)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de ingresso inválido'
            })
        }

        const ingresso = await queryAsync(
            'SELECT * FROM ingresso WHERE id = ?',
            [idNum]
        )

        if (ingresso.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Ingresso não encontrado'
            })
        }

        res.json({
            sucesso: true,
            dados: ingresso[0]
        })

    } catch (erro) {
        console.error('Erro ao buscar ingresso:', erro)

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar ingresso',
            erro: erro.message
        })
    }
})


app.post('/ingressos', async (req, res) => {
    try {
        const { sessao_id, numero_assento, tipo, valor_pago, status } = req.body

        if (!sessao_id || !numero_assento || !tipo || !valor_pago) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Campos obrigatórios não preenchidos'
            })
        }

        const resultado = await queryAsync(
            `INSERT INTO ingresso
            (sessao_id, numero_assento, tipo, valor_pago, status)
            VALUES (?, ?, ?, ?, ?)`,
            [sessao_id, numero_assento, tipo, valor_pago, status || 'reservado']
        )

        res.status(201).json({
            sucesso: true,
            mensagem: 'Ingresso criado com sucesso',
            id: resultado.insertId
        })

    } catch (erro) {
        console.error('Erro ao criar ingresso:', erro)

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao criar ingresso',
            erro: erro.message
        })
    }
})


app.put('/ingressos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { sessao_id, numero_assento, tipo, valor_pago, status } = req.body

        const idNum = parseInt(id)

        if (!id || isNaN(idNum)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de ingresso inválido'
            })
        }

        const ingressoExiste = await queryAsync(
            'SELECT * FROM ingresso WHERE id = ?',
            [idNum]
        )

        if (ingressoExiste.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Ingresso não encontrado'
            })
        }

        await queryAsync(
            `UPDATE ingresso
            SET sessao_id = ?, numero_assento = ?, tipo = ?, valor_pago = ?, status = ?
            WHERE id = ?`,
            [sessao_id, numero_assento, tipo, valor_pago, status, idNum]
        )

        res.json({
            sucesso: true,
            mensagem: 'Ingresso atualizado com sucesso'
        })

    } catch (erro) {
        console.error('Erro ao atualizar ingresso:', erro)

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar ingresso',
            erro: erro.message
        })
    }
})


app.delete('/ingressos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const idNum = parseInt(id)

        if (!id || isNaN(idNum)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de ingresso inválido'
            })
        }

        const ingressoExiste = await queryAsync(
            'SELECT * FROM ingresso WHERE id = ?',
            [idNum]
        )

        if (ingressoExiste.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Ingresso não encontrado'
            })
        }

        await queryAsync(
            'DELETE FROM ingresso WHERE id = ?',
            [idNum]
        )

        res.json({
            sucesso: true,
            mensagem: 'Ingresso deletado com sucesso'
        })

    } catch (erro) {
        console.error('Erro ao deletar ingresso:', erro)

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao deletar ingresso',
            erro: erro.message
        })
    }
})