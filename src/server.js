import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import express from 'express';
import axios from "axios";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express() // You can also use Express
	.get('/test', async (req, res) => {
		const token = process.env.SPOTIFY_TOKEN;
		let data = {};
		await axios
			.get("https://api.spotify.com/v1/me/player", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then(function (response) {
				console.log(response.data)
				data = response.data
			})
			.catch(function (err) {
				console.log(err.response.data)
			});
		res.send(data)
	})
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
