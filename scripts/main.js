import BossHealthBar from './bossHealthBar.js';

Hooks.once('init', async () => {
  await game.settings.register('BossHealthBar', 'progress', {
    name: 'progress',
    scope: 'world',
    config: false,
    type: Number,
    default: 0,
    range: {
      min: 0,
      max: 500,
      step: 1
    },
    onChange: value => {
			let pg = $('#boss-health [name=progress]');
			pg.css('width', value+'%');
    }
  });
  await game.settings.register('BossHealthBar', 'visible', {
    name: 'visible',
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
    onChange: value => {
      if (value) $('#boss-health').addClass('visible');
      else $('#boss-health').removeClass('visible');
    }
  });
  await game.settings.register('BossHealthBar', 'bossNameLabel', {
    name: 'bossNameLabel',
    scope: 'world',
    config: false,
    type: String,
    default: 'Piet the Boss',
    onChange: value => {
			bossNameLabel.innerText = value;
    }
  });
});

Hooks.once('ready', () => {
  window.BossHealthBar = new BossHealthBar().render(true);
});
  
Hooks.on('updateToken', (token, data, options, id) => {
	
	if(window.BossHealthBar && window.BossHealthBar.selectedToken && data._id == window.BossHealthBar.selectedToken.id)
	{
		window.BossHealthBar.updateHP();
	}
})