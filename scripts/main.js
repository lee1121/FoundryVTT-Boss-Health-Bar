import BossHealthBar from './bossHealthBar.js';

Hooks.once('init', async () => {
  await game.settings.register('BossHealthBar', 'hpValueOne', {
    name: 'hpValueOne',
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
			let pg = $('#boss-health [name=hpValueOne]');
			pg.css('width', value+'%');
    }
  });
  await game.settings.register('BossHealthBar', 'hpValueTwo', {
    name: 'hpValueTwo',
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
			let pg = $('#boss-health [name=hpValueTwo]');
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
  await game.settings.register('BossHealthBar', 'secondBarVisible', {
    name: 'secondBarVisible',
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
    onChange: value => {
      if (value) $('#boss-health-bar-two').addClass('secondBarVisible');
      else $('#boss-health-bar-two').removeClass('secondBarVisible');
    }
  });
  await game.settings.register('BossHealthBar', 'bossNameLabelOne', {
    name: 'bossNameLabelOne',
    scope: 'world',
    config: false,
    type: String,
    default: 'Piet the Boss',
    onChange: value => {
			bossNameLabelOne.innerText = value;
    }
  });
  await game.settings.register('BossHealthBar', 'bossNameLabelTwo', {
    name: 'bossNameLabelTwo',
    scope: 'world',
    config: false,
    type: String,
    default: 'Piet the Boss',
    onChange: value => {
			bossNameLabelTwo.innerText = value;
    }
  });
});

Hooks.once('ready', () => {
  window.BossHealthBar = new BossHealthBar().render(true);
});
  
Hooks.on('updateToken', (token, data, options, id) => {
	
	if(window.BossHealthBar && window.BossHealthBar.selectedTokens)
	{
		let matchesAnyID = false;
		
		for (let controlledIndex = 0; controlledIndex < window.BossHealthBar.selectedTokens.length; controlledIndex++) {
			if(data._id == window.BossHealthBar.selectedTokens[controlledIndex].id)
			{
				matchesAnyID = true;
			}
		}
		
		if(matchesAnyID)
		{
			window.BossHealthBar.updateAllHP();
		}
	}
})